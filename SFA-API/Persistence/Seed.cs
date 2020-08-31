using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

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
        }
    }
}