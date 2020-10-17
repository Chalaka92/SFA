using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SalesReps
{
    public class GroupByUserId
    {
        public class Query : IRequest<List<SalesRepUserDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<SalesRepUserDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<SalesRepUserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var salesReps = await _context.SalesReps.ToListAsync();
                if (salesReps == null)
                    return null;

                var returnSalesReps = new List<SalesRepUserDto>();
                salesReps.GroupBy(a => a.UserId).ToList().ForEach(async x =>
                  {
                      var returnSalesRep = new SalesRepUserDto();
                      returnSalesRep.UserId = x.Key;
                      var user = await _context.UserDetails.FindAsync(returnSalesRep.UserId);
                      returnSalesRep.UserName = user.FirstName + ' ' + user.LastName;
                      returnSalesRep.SalesRepDtos = _mapper.Map<List<SalesRep>, List<SalesRepDto>>(x.ToList());

                      if (returnSalesRep.SalesRepDtos != null)
                      {

                          returnSalesRep.SalesRepDtos.ToList().ForEach(async z =>
                                          {
                                              var user = await _context.UserDetails.FindAsync(z.UserId);
                                              var store = await _context.Stores.FindAsync(z.AssignedStoreId);
                                              var area = await _context.Areas.FindAsync(z.AssignedAreaId);
                                              z.UserName = user.FirstName + ' ' + user.LastName;
                                              z.AssignedStoreName = store.Name;
                                              z.AssignedAreaName = area.Name;
                                          });
                      }

                      returnSalesReps.Add(returnSalesRep);

                  });

                return returnSalesReps;
            }
        }

    }
}