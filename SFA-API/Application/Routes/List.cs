using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Routes
{
    public class List
    {
        public class Query : IRequest<List<RouteDto>> { }

        public class Handler : IRequestHandler<Query, List<RouteDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<RouteDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var routes = await _context.Routes.ToListAsync();
                var returnRoutes = _mapper.Map<List<Route>, List<RouteDto>>(routes);
                if (returnRoutes == null)
                    return null;

                returnRoutes.ForEach(async x =>
                {
                    var area = await _context.Areas.FindAsync(x.AreaId);
                    var district = await _context.Districts.FindAsync(area.DistrictId);
                    x.AreaName = area.Name;
                    x.DistrictId = area.DistrictId;
                    x.ProvinceId = district.ProvinceId;
                });

                return returnRoutes;
            }
        }

    }
}