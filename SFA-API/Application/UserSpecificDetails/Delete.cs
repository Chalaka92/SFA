using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.UserSpecificDetails
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var userSpecificDetail = await _context.UserSpecificDetails.FindAsync(request.Id);

                if (userSpecificDetail == null)
                    throw new RestException(HttpStatusCode.NotFound, new { userSpecificDetail = "Not Found" });

                _context.Remove(userSpecificDetail);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}