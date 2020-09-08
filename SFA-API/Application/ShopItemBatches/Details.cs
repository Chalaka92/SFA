using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.ShopItemBatches
{
    public class Details
    {
        public class Query : IRequest<ShopItemBatchDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ShopItemBatchDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<ShopItemBatchDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var shopItemBatch = await _context.ShopItemBatches.FindAsync(request.Id);

                if (shopItemBatch == null)
                    throw new RestException(HttpStatusCode.NotFound, new { shopItemBatch = "Not Found" });

                var returnShopItemBatch = _mapper.Map<ShopItemBatch, ShopItemBatchDto>(shopItemBatch);

                return returnShopItemBatch;
            }
        }
    }
}