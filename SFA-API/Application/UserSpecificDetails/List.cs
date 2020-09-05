using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserSpecificDetails
{
    public class List
    {
        public class Query : IRequest<List<UserSpecificDetail>> { }

        public class Handler : IRequestHandler<Query, List<UserSpecificDetail>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserSpecificDetail>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userSpecificDetails = await _context.UserSpecificDetails.ToListAsync();
                return userSpecificDetails;
            }
        }

    }
}