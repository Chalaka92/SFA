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
        public DbSet<ShopCategory> ShopCategories { get; set; }
        public DbSet<StatusType> StatusTypes { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<PaymentType> PaymentTypes { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<UserAddress> UserAddresses { get; set; }
        public DbSet<UserEmail> UserEmails { get; set; }
        public DbSet<UserContact> UserContacts { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<ShopAddress> ShopAddresses { get; set; }
        public DbSet<ShopEmail> ShopEmails { get; set; }
        public DbSet<ShopContact> ShopContacts { get; set; }
        public DbSet<UserSpecificDetail> UserSpecificDetails { get; set; }

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

            builder.Entity<Status>()
            .HasOne(u => u.StatusType)
            .WithMany(a => a.Statuses)
            .HasForeignKey(u => u.StatusTypeId);

            builder.Entity<UserAddress>()
           .HasOne(u => u.UserDetails)
           .WithMany(a => a.UserAddresses)
           .HasForeignKey(u => u.UserId);

            builder.Entity<UserEmail>()
           .HasOne(u => u.UserDetails)
           .WithMany(a => a.UserEmails)
           .HasForeignKey(u => u.UserId);

            builder.Entity<UserContact>()
           .HasOne(u => u.UserDetails)
           .WithMany(a => a.UserContacts)
           .HasForeignKey(u => u.UserId);

            builder.Entity<ShopAddress>()
            .HasOne(u => u.Shop)
            .WithMany(a => a.ShopAddresses)
            .HasForeignKey(u => u.ShopId);

            builder.Entity<ShopEmail>()
           .HasOne(u => u.Shop)
           .WithMany(a => a.ShopEmails)
           .HasForeignKey(u => u.ShopId);

            builder.Entity<ShopContact>()
           .HasOne(u => u.Shop)
           .WithMany(a => a.ShopContacts)
           .HasForeignKey(u => u.ShopId);
        }
    }
}
