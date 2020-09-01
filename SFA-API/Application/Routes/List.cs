using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Routes
{
    public class List
    {
        public class Query : IRequest<List<Route>> { }

        public class Handler : IRequestHandler<Query, List<Route>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Route>> Handle(Query request, CancellationToken cancellationToken)
            {
                var routes = await _context.Routes.ToListAsync();
                return routes;
            }
        }

    }
}