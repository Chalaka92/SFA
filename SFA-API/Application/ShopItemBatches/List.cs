using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ShopItemBatches
{
    public class List
    {
        public class Query : IRequest<List<ShopItemBatchDto>> { }

        public class Handler : IRequestHandler<Query, List<ShopItemBatchDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<ShopItemBatchDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shopItemBatches = await _context.ShopItemBatches.ToListAsync();
                var returnShopItemBatches = _mapper.Map<List<ShopItemBatch>, List<ShopItemBatchDto>>(shopItemBatches);

                return returnShopItemBatches;
            }
        }

    }
}