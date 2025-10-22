using AutoMapper;
using Microsoft.AspNetCore.Identity;
using to_do_list.Core.Dtos;
using to_do_list.Core.Interfaces;
using to_do_list.Identity;

namespace to_do_list.Core.Services;

public class UserService : IUserService
{
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    public UserService(IMapper mapper, UserManager<User> userManager)
    {
        _mapper = mapper;
        _userManager = userManager;
    }

    public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
    {
        var existingByEmail = await _userManager.FindByEmailAsync(dto.Email);
        if (existingByEmail != null)
            throw new ArgumentException("Já existe um usuário com esse e-mail.");

        var user = _mapper.Map<User>(dto);
        user.UserName = dto.Email;
        user.NormalizedUserName = dto.Email.ToUpperInvariant();

        if (dto.PhotoData != null && dto.PhotoData.Length > 0)
        {
            var allowed = new[] { "image/jpeg", "image/png", "image/gif" };
            if (!allowed.Contains(dto.PhotoData.ContentType))
                throw new ArgumentException("Tipo de arquivo de foto não permitido.");

            if (dto.PhotoData.Length > 2 * 1024 * 1024)
                throw new ArgumentException("Arquivo de foto muito grande (máx 2MB).");

            using var ms = new MemoryStream();
            await dto.PhotoData.CopyToAsync(ms);
            user.PhotoData = ms.ToArray();
        }

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
        {
            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
            throw new ArgumentException(errors);
        }

        return _mapper.Map<UserDto>(user); ;
    }

    public async Task<UserDto> UpdateUserAsync(string userId, UpdateUserDto dto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            throw new KeyNotFoundException("Usuário não encontrado");

        if (!string.IsNullOrWhiteSpace(dto.Email) && !string.Equals(dto.Email, user.Email, StringComparison.OrdinalIgnoreCase))
        {
            var existing = await _userManager.FindByEmailAsync(dto.Email);
            if (existing != null && existing.Id != user.Id)
                throw new ArgumentException("Já existe um usuário com esse e-mail.");

            var setEmailResult = await _userManager.SetEmailAsync(user, dto.Email);
            if (!setEmailResult.Succeeded)
            {
                var errors = string.Join("; ", setEmailResult.Errors.Select(e => e.Description));
                throw new ArgumentException(errors);
            }
            var setUserNameResult = await _userManager.SetUserNameAsync(user, dto.Email);
            if (!setUserNameResult.Succeeded)
            {
                var errors = string.Join("; ", setUserNameResult.Errors.Select(e => e.Description));
                throw new ArgumentException(errors);
            }
        }

        if (!string.IsNullOrWhiteSpace(dto.Surname) && !string.Equals(dto.Surname, user.Surname, StringComparison.OrdinalIgnoreCase))
        {
            user.Surname = dto.Surname;
        }

        if (dto.PhotoData != null && dto.PhotoData.Length > 0)
        {
            var allowed = new[] { "image/jpeg", "image/png", "image/gif" };
            if (!allowed.Contains(dto.PhotoData.ContentType))
                throw new ArgumentException("Tipo de arquivo de foto não permitido.");

            const long maxBytes = 2 * 1024 * 1024;
            if (dto.PhotoData.Length > maxBytes)
                throw new ArgumentException("Arquivo de foto muito grande (máx 2MB).");

            using var ms = new MemoryStream();
            await dto.PhotoData.CopyToAsync(ms);
            user.PhotoData = ms.ToArray();
        }
        else
        {
            user.PhotoData = [];
        }

        if (!string.IsNullOrEmpty(dto.Password))
        {
            if (dto.Password.Length < 6)
                throw new ArgumentException("A Senha deve conter no mínimo 6 digitos.");

            var hasPassword = await _userManager.HasPasswordAsync(user);

            if (string.IsNullOrWhiteSpace(dto.CurrentPassword))
                throw new ArgumentException("Senha atual é necessária para alterar a senha.");

            var changePwdResult = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.Password);
            if (!changePwdResult.Succeeded)
            {
                var errors = string.Join("; ", changePwdResult.Errors.Select(e => e.Description));
                throw new ArgumentException(errors);
            }
        }

        var updateResult = await _userManager.UpdateAsync(user);
        if (!updateResult.Succeeded)
        {
            var errors = string.Join("; ", updateResult.Errors.Select(e => e.Description));
            throw new ArgumentException(errors);
        }

        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto> GetUserByIdAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
            throw new KeyNotFoundException("Usuário não encontrado");
        return _mapper.Map<UserDto>(user);
    }
}
