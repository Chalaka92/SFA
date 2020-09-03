using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Shops
{
    public class List
    {
        public class Query : IRequest<List<Shop>> { }

        public class Handler : IRequestHandler<Query, List<Shop>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Shop>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shops = await _context.Shops.ToListAsync();
                return shops;
            }
        }

    }
}