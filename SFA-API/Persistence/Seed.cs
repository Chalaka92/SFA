using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedDataAsync(DataContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }
            if (!await roleManager.RoleExistsAsync("AreaManager"))
            {
                await roleManager.CreateAsync(new IdentityRole("AreaManager"));
            }
            if (!await roleManager.RoleExistsAsync("StoreManager"))
            {
                await roleManager.CreateAsync(new IdentityRole("StoreManager"));
            }
            if (!await roleManager.RoleExistsAsync("ShopOwner"))
            {
                await roleManager.CreateAsync(new IdentityRole("ShopOwner"));
            }
            if (!await roleManager.RoleExistsAsync("SalesRep"))
            {
                await roleManager.CreateAsync(new IdentityRole("SalesRep"));
            }

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Chalaka",
                        UserName = "ChalakaRathnayake",
                        Email = "chalaka@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Supun",
                        UserName = "SupunSanjeewa",
                        Email = "supun@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Isuru",
                        UserName = "IsuruSampath",
                        Email = "isuru@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Admin");
                }
            }

            if (!context.Values.Any())
            {
                var values = new List<Value>
                {
                    new Value { Id = 1, Name = "Value 101" },
                    new Value { Id = 2, Name = "Value 102" },
                    new Value { Id = 3, Name = "Value 103" }
                };

                await context.Values.AddRangeAsync(values);
                await context.SaveChangesAsync();
            }

            if (!context.Provinces.Any())
            {
                var provinces = new List<Province>
                {
                    new Province { Id = 1, Name = "Central" },
                    new Province { Id = 2, Name = "Eastern" },
                    new Province { Id = 3, Name = "Northern" },
                    new Province { Id = 4, Name = "Southern" },
                    new Province { Id = 5, Name = "Western" },
                    new Province { Id = 6, Name = "North Western" },
                    new Province { Id = 7, Name = "North Central" },
                    new Province { Id = 8, Name = "Uva" },
                    new Province { Id = 9, Name = "Sabaragamuwa" }
                };

                await context.Provinces.AddRangeAsync(provinces);
                await context.SaveChangesAsync();
            }

            if (!context.Districts.Any())
            {
                var districts = new List<District>
                {
                    new District{Id=1, ProvinceId=2, Name="Ampara"},
                    new District{Id=2, ProvinceId=7, Name="Anuradhapura"},
                    new District{Id=3, ProvinceId=8, Name="Badulla"},
                    new District{Id=4, ProvinceId=2, Name="Batticaloa"},
                    new District{Id=5, ProvinceId=5, Name="Colombo"},
                    new District{Id=6, ProvinceId=4, Name="Galle"},
                    new District{Id=7, ProvinceId=5, Name="Gampaha"},
                    new District{Id=8, ProvinceId=4, Name="Hambantota"},
                    new District{Id=9, ProvinceId=3, Name="Jaffna"},
                    new District{Id=10,ProvinceId= 5,Name= "Kalutara"},
                    new District{Id=11,ProvinceId= 1,Name= "Kandy"},
                    new District{Id=12,ProvinceId= 9,Name= "Kegalle"},
                    new District{Id=13,ProvinceId= 3,Name= "Kilinochchi"},
                    new District{Id=14,ProvinceId= 6,Name= "Kurunegala"},
                    new District{Id=15,ProvinceId= 3,Name= "Mannar"},
                    new District{Id=16,ProvinceId= 1,Name= "Matale"},
                    new District{Id=17,ProvinceId= 4,Name= "Matara"},
                    new District{Id=18,ProvinceId= 8,Name= "Monaragala"},
                    new District{Id=19,ProvinceId= 3,Name= "Mullaitivu"},
                    new District{Id=20,ProvinceId= 1,Name= "Nuwara Eliya"},
                    new District{Id=21,ProvinceId= 7,Name= "Polonnaruwa"},
                    new District{Id=22,ProvinceId= 6,Name= "Puttalam"},
                    new District{Id=23,ProvinceId= 9,Name= "Ratnapura"},
                    new District{Id=24,ProvinceId= 2,Name= "Trincomalee"},
                    new District{Id=25,ProvinceId= 3,Name= "Vavuniya"}
                };

                await context.Districts.AddRangeAsync(districts);
                await context.SaveChangesAsync();
            }
        }
    }
}