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
        public DbSet<Store> Stores { get; set; }
        public DbSet<StoreEmail> StoreEmails { get; set; }
        public DbSet<StoreContact> StoreContacts { get; set; }
        public DbSet<StoreAddress> StoreAddresses { get; set; }
        public DbSet<ReturnType> ReturnTypes { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<SalesRep> SalesReps { get; set; }
        public DbSet<ItemBatch> ItemBatches { get; set; }
        public DbSet<Target> Targets { get; set; }
        public DbSet<FreeIssue> FreeIssues { get; set; }
        public DbSet<StoreItemBatch> StoreItemBatches { get; set; }
        public DbSet<SalesRepItemBatch> SalesRepItemBatches { get; set; }
        public DbSet<ShopItemBatch> ShopItemBatches { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItemBatch> OrderItemBatches { get; set; }

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

            builder.Entity<Shop>()
            .HasOne(u => u.Route)
            .WithMany(a => a.Shops)
            .HasForeignKey(u => u.RouteId);

            builder.Entity<UserDetail>()
            .HasOne(u => u.Shop)
            .WithOne(a => a.UserDetail)
            .HasForeignKey<Shop>(u => u.ShopOwnerId);

            builder.Entity<Status>()
            .HasOne(u => u.Shop)
            .WithOne(a => a.Status)
            .HasForeignKey<Shop>(u => u.StatusId);

            builder.Entity<Shop>()
           .HasOne(u => u.ShopCategory)
           .WithMany(a => a.Shops)
           .HasForeignKey(u => u.ShopCategoryId);

            builder.Entity<StoreAddress>()
             .HasOne(u => u.Store)
             .WithMany(a => a.StoreAddresses)
             .HasForeignKey(u => u.StoreId);

            builder.Entity<StoreEmail>()
           .HasOne(u => u.Store)
           .WithMany(a => a.StoreEmails)
           .HasForeignKey(u => u.StoreId);

            builder.Entity<StoreContact>()
           .HasOne(u => u.Store)
           .WithMany(a => a.StoreContacts)
           .HasForeignKey(u => u.StoreId);

            builder.Entity<Store>()
           .HasOne(u => u.Route)
           .WithMany(a => a.Stores)
           .HasForeignKey(u => u.RouteId);

            builder.Entity<UserDetail>()
            .HasOne(u => u.Store)
            .WithOne(a => a.UserDetail)
            .HasForeignKey<Store>(u => u.StoreManagerId);

            builder.Entity<Item>()
           .HasOne(u => u.ItemCategory)
           .WithMany(a => a.Items)
           .HasForeignKey(u => u.CategoryId);

            builder.Entity<UserDetail>()
            .HasOne(u => u.SalesRep)
            .WithOne(a => a.UserDetail)
            .HasForeignKey<SalesRep>(u => u.UserId);

            builder.Entity<ItemBatch>()
           .HasOne(u => u.Item)
           .WithMany(a => a.ItemBatches)
           .HasForeignKey(u => u.ItemId);

            builder.Entity<Status>()
            .HasOne(u => u.ItemBatch)
            .WithOne(a => a.Status)
            .HasForeignKey<ItemBatch>(u => u.ItemStatusId);

            builder.Entity<Item>()
            .HasOne(u => u.Target)
            .WithOne(a => a.Item)
            .HasForeignKey<Target>(u => u.ItemId);

            builder.Entity<StoreItemBatch>()
            .HasOne(u => u.Store)
            .WithMany(a => a.StoreItemBatches)
            .HasForeignKey(u => u.StoreId);

            builder.Entity<StoreItemBatch>()
           .HasOne(u => u.ItemBatch)
           .WithMany(a => a.StoreItemBatches)
           .HasForeignKey(u => u.ItemBatchId);

            builder.Entity<SalesRepItemBatch>()
             .HasOne(u => u.SalesRep)
             .WithMany(a => a.SalesRepItemBatches)
             .HasForeignKey(u => u.SalesRepId);

            builder.Entity<SalesRepItemBatch>()
           .HasOne(u => u.ItemBatch)
           .WithMany(a => a.SalesRepItemBatches)
           .HasForeignKey(u => u.ItemBatchId);

            builder.Entity<ShopItemBatch>()
             .HasOne(u => u.Shop)
             .WithMany(a => a.ShopItemBatches)
             .HasForeignKey(u => u.ShopId);

            builder.Entity<ShopItemBatch>()
           .HasOne(u => u.ItemBatch)
           .WithMany(a => a.ShopItemBatches)
           .HasForeignKey(u => u.ItemBatchId);

            builder.Entity<OrderItemBatch>()
              .HasOne(u => u.Order)
              .WithMany(a => a.OrderItemBatches)
              .HasForeignKey(u => u.OrderId);

            builder.Entity<OrderItemBatch>()
           .HasOne(u => u.ItemBatch)
           .WithMany(a => a.OrderItemBatches)
           .HasForeignKey(u => u.ItemBatchId);

            builder.Entity<Order>()
              .HasOne(u => u.Shop)
              .WithMany(a => a.Orders)
              .HasForeignKey(u => u.ShopId);

            builder.Entity<Order>()
            .HasOne(u => u.SalesRep)
            .WithMany(a => a.Orders)
            .HasForeignKey(u => u.SalesRepId);
        }
    }
}
