using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedDataAsync(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Chalaka",
                        UserName = "Chalaka",
                        Email = "chalaka@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Supun",
                        UserName = "Supun",
                        Email = "supun@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Isuru",
                        UserName = "Isuru",
                        Email = "isuru@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
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