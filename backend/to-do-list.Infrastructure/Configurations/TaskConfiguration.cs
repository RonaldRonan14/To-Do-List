using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace to_do_list.Infrastructure.Configurations;

public class TaskConfiguration : IEntityTypeConfiguration<Domain.Entities.TaskEntity>
{
    public void Configure(EntityTypeBuilder<Domain.Entities.TaskEntity> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(250);

        builder.Property(t => t.Annotations)
            .IsRequired(false)
            .HasMaxLength(4000);

        builder.Property(t => t.Completed)
            .HasDefaultValue(false)
            .IsRequired();

        builder.Property(t => t.Favorited)
            .HasDefaultValue(false)
            .IsRequired();

        builder.Property(t => t.DueDate)
            .IsRequired(false);

        builder.Property(t => t.DateCompleted)
            .IsRequired(false);

        builder.HasIndex(t => t.Completed);
        builder.HasIndex(t => t.Favorited);
    }
}
