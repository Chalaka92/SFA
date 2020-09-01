using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Routes
{
    public class ListByAreatId
    {
        public class Query : IRequest<List<Route>>
        {
            public int AreaId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Route>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Route>> Handle(Query request, CancellationToken cancellationToken)
            {
                var routes = await _context.Routes.Where(x => x.AreaId == request.AreaId).ToListAsync();
                return routes;
            }
        }

    }
}