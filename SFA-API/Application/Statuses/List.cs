using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Statuses
{
    public class List
    {
        public class Query : IRequest<List<Status>> { }

        public class Handler : IRequestHandler<Query, List<Status>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Status>> Handle(Query request, CancellationToken cancellationToken)
            {
                var statuses = await _context.Statuses.ToListAsync();
                return statuses;
            }
        }

    }
}