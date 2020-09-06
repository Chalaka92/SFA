using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserDetails
{
    public class List
    {
        public class Query : IRequest<List<UserDetailDto>> { }

        public class Handler : IRequestHandler<Query, List<UserDetailDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<UserDetailDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userDetails = await _context.UserDetails.ToListAsync();
                var returnUserDetails = _mapper.Map<List<UserDetail>, List<UserDetailDto>>(userDetails);

                return returnUserDetails;
            }
        }

    }
}