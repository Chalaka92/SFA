using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ShopCategories
{
    public class List
    {
        public class Query : IRequest<List<ShopCategory>> { }

        public class Handler : IRequestHandler<Query, List<ShopCategory>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ShopCategory>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shopCategories = await _context.ShopCategories.ToListAsync();
                return shopCategories;
            }
        }

    }
}