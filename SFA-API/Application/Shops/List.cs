using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Shops
{
    public class List
    {
        public class Query : IRequest<List<ShopDto>> { }

        public class Handler : IRequestHandler<Query, List<ShopDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<ShopDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shops = await _context.Shops.ToListAsync();
                var returnShops = _mapper.Map<List<Shop>, List<ShopDto>>(shops);

                return returnShops;
            }
        }

    }
}