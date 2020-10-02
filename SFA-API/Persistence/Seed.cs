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
                    new Value { Name = "Value 101" },
                    new Value { Name = "Value 102" },
                    new Value { Name = "Value 103" }
                };

                await context.Values.AddRangeAsync(values);
                await context.SaveChangesAsync();
            }

            if (!context.Provinces.Any())
            {
                var provinces = new List<Province>
                {
                    new Province {  Name = "Central" },
                    new Province {  Name = "Eastern" },
                    new Province {  Name = "Northern" },
                    new Province {  Name = "Southern" },
                    new Province {  Name = "Western" },
                    new Province {  Name = "North Western" },
                    new Province {  Name = "North Central" },
                    new Province {  Name = "Uva" },
                    new Province {  Name = "Sabaragamuwa" }
                };

                await context.Provinces.AddRangeAsync(provinces);
                await context.SaveChangesAsync();
            }

            if (!context.Districts.Any())
            {
                var districts = new List<District>
                {
                    new District{ProvinceId=2, Name="Ampara"},
                    new District{ProvinceId=7, Name="Anuradhapura"},
                    new District{ProvinceId=8, Name="Badulla"},
                    new District{ProvinceId=2, Name="Batticaloa"},
                    new District{ProvinceId=5, Name="Colombo"},
                    new District{ProvinceId=4, Name="Galle"},
                    new District{ProvinceId=5, Name="Gampaha"},
                    new District{ProvinceId=4, Name="Hambantota"},
                    new District{ProvinceId=1, Name="Jaffna"},
                    new District{ProvinceId= 5,Name= "Kalutara"},
                    new District{ProvinceId= 3,Name= "Kandy"},
                    new District{ProvinceId= 9,Name= "Kegalle"},
                    new District{ProvinceId= 1,Name= "Kilinochchi"},
                    new District{ProvinceId= 6,Name= "Kurunegala"},
                    new District{ProvinceId= 1,Name= "Mannar"},
                    new District{ProvinceId= 3,Name= "Matale"},
                    new District{ProvinceId= 4,Name= "Matara"},
                    new District{ProvinceId= 8,Name= "Monaragala"},
                    new District{ProvinceId= 1,Name= "Mullaitivu"},
                    new District{ProvinceId= 3,Name= "Nuwara Eliya"},
                    new District{ProvinceId= 7,Name= "Polonnaruwa"},
                    new District{ProvinceId= 6,Name= "Puttalam"},
                    new District{ProvinceId= 9,Name= "Ratnapura"},
                    new District{ProvinceId= 2,Name= "Trincomalee"},
                    new District{ProvinceId= 1,Name= "Vavuniya"}
                };

                await context.Districts.AddRangeAsync(districts);
                await context.SaveChangesAsync();
            }
        }
    }
}