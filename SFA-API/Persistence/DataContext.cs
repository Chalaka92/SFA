using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Route> Routes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<District>()
                .HasOne(u => u.Province)
                .WithMany(a => a.Districts)
                .HasForeignKey(u => u.ProvinceId);

            builder.Entity<Area>()
            .HasOne(u => u.District)
            .WithMany(a => a.Areas)
            .HasForeignKey(u => u.DistrictId);

            builder.Entity<Route>()
           .HasOne(u => u.Area)
           .WithMany(a => a.Routes)
           .HasForeignKey(u => u.AreaId);
        }
    }
}
