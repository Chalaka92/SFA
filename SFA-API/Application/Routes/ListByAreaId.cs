using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Routes
{
    public class ListByAreatId
    {
        public class Query : IRequest<List<RouteDto>>
        {
            public int AreaId { get; set; }
        }

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
                var routes = await _context.Routes.Where(x => x.AreaId == request.AreaId).ToListAsync();
                var returnRoutes = _mapper.Map<List<Route>, List<RouteDto>>(routes);

                return returnRoutes;
            }
        }

    }
}