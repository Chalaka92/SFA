using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.UserDetails
{
    public class Details
    {
        public class Query : IRequest<UserDetail>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserDetail>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<UserDetail> Handle(Query request, CancellationToken cancellationToken)
            {
                var userDetail = await _context.UserDetails.FindAsync(request.Id);

                if (userDetail == null)
                    throw new RestException(HttpStatusCode.NotFound, new { userDetail = "Not Found" });

                return userDetail;
            }
        }
    }
}