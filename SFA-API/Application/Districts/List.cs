using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Districts
{
    public class List
    {
        public class Query : IRequest<List<District>> { }

        public class Handler : IRequestHandler<Query, List<District>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<District>> Handle(Query request, CancellationToken cancellationToken)
            {
                var districts = await _context.Districts.ToListAsync();
                return districts;
            }
        }

    }
}