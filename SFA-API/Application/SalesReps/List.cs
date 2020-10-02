using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SalesReps
{
    public class List
    {
        public class Query : IRequest<List<SalesRepDto>> { }

        public class Handler : IRequestHandler<Query, List<SalesRepDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<SalesRepDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var salesReps = await _context.SalesReps.ToListAsync();
                var returnSalesReps = _mapper.Map<List<SalesRep>, List<SalesRepDto>>(salesReps);
                if (returnSalesReps == null)
                    return null;

                returnSalesReps.ForEach(async x =>
                {
                    var user = await _context.UserDetails.FindAsync(x.UserId);
                    var store = await _context.Stores.FindAsync(x.AssignedStoreId);
                    var area = await _context.Areas.FindAsync(x.AssignedAreaId);
                    x.UserName = user.FirstName + ' ' + user.LastName;
                    x.AssignedStoreName = store.Name;
                    x.AssignedAreaName = area.Name;
                });
                return returnSalesReps;
            }
        }

    }
}