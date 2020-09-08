using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Stores
{
    public class List
    {
        public class Query : IRequest<List<StoreDto>> { }

        public class Handler : IRequestHandler<Query, List<StoreDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<StoreDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var stores = await _context.Stores.ToListAsync();
                var returnStores = _mapper.Map<List<Store>, List<StoreDto>>(stores);

                return returnStores;
            }
        }

    }
}