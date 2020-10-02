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

namespace Application.Stores
{
    public class List
    {
        public class Query : IRequest<List<StoreDto>> { }

        public class Handler : IRequestHandler<Query, List<StoreDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
                this._userManager = userManager;
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<StoreDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var stores = await _context.Stores.ToListAsync();
                var returnStores = _mapper.Map<List<Store>, List<StoreDto>>(stores);
                if (returnStores == null)
                    return null;

                returnStores.ForEach(async x =>
                {
                    var createUserDetails = await _userManager.FindByIdAsync(x.CreatedBy);
                    x.CreatedBy = createUserDetails.DisplayName;

                    var storeManager = await _context.UserDetails.FindAsync(x.StoreManagerId);
                    var route = await _context.Routes.FindAsync(x.RouteId);

                    x.StoreManagerName = storeManager.FirstName + ' ' + storeManager.LastName;
                    x.RouteName = route.Name;

                    var firstAddress = x.StoreAddresses.FirstOrDefault();
                    var district = await _context.Districts.FindAsync(firstAddress.DistrictId);
                    var province = await _context.Provinces.FindAsync(firstAddress.ProvinceId);
                    string[] displayAddress = { firstAddress.Address1, firstAddress.Address2, firstAddress.Address3, district.Name, province.Name };

                    x.DisplayAddress = string.Join(",", displayAddress.Where(e => !string.IsNullOrWhiteSpace(e)));

                });
                return returnStores;
            }
        }

    }
}