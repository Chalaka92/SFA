using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Areas
{
    public class List
    {
        public class Query : IRequest<List<Area>> { }

        public class Handler : IRequestHandler<Query, List<Area>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Area>> Handle(Query request, CancellationToken cancellationToken)
            {
                var areas = await _context.Areas.ToListAsync();
                return areas;
            }
        }

    }
}