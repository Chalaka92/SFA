using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Shops
{
    public class List
    {
        public class Query : IRequest<List<ShopDto>> { }

        public class Handler : IRequestHandler<Query, List<ShopDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<ShopDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shops = await _context.Shops.ToListAsync();
                var returnShops = _mapper.Map<List<Shop>, List<ShopDto>>(shops);
                if (returnShops == null)
                    return null;

                returnShops.ForEach(async x =>
                {
                    var createUserDetails = await _userManager.FindByIdAsync(x.CreatedBy);
                    x.CreatedBy = createUserDetails.DisplayName;

                    var shopOwner = await _context.UserDetails.FindAsync(x.ShopOwnerId);
                    var shopCategory = await _context.ShopCategories.FindAsync(x.ShopCategoryId);
                    var route = await _context.Routes.FindAsync(x.RouteId);

                    x.ShopOwnerName = shopOwner.FirstName + ' ' + shopOwner.LastName;
                    x.ShopCategoryName = shopCategory.Name;
                    x.RouteName = route.Name;

                    var firstAddress = x.ShopAddresses.FirstOrDefault();
                    var district = await _context.Districts.FindAsync(firstAddress.DistrictId);
                    var province = await _context.Provinces.FindAsync(firstAddress.ProvinceId);
                    string[] displayAddress = { firstAddress.Address1, firstAddress.Address2, firstAddress.Address3, district.Name, province.Name };

                    x.DisplayAddress = string.Join(",", displayAddress.Where(e => !string.IsNullOrWhiteSpace(e)));

                });
                return returnShops;
            }
        }

    }
}