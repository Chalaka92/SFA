using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.UserSpecificDetails
{
    public class Details
    {
        public class Query : IRequest<UserSpecificDetail>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserSpecificDetail>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<UserSpecificDetail> Handle(Query request, CancellationToken cancellationToken)
            {
                var userSpecificDetail = await _context.UserSpecificDetails.FindAsync(request.Id);

                if (userSpecificDetail == null)
                    throw new RestException(HttpStatusCode.NotFound, new { userSpecificDetail = "Not Found" });

                return userSpecificDetail;
            }
        }
    }
}