using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SalesRepItemBatches
{
    public class List
    {
        public class Query : IRequest<List<SalesRepItemBatchDto>> { }

        public class Handler : IRequestHandler<Query, List<SalesRepItemBatchDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<SalesRepItemBatchDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var salesRepItemBatches = await _context.SalesRepItemBatches.ToListAsync();
                var returnSalesRepItemBatches = _mapper.Map<List<SalesRepItemBatch>, List<SalesRepItemBatchDto>>(salesRepItemBatches);

                return returnSalesRepItemBatches;
            }
        }

    }
}