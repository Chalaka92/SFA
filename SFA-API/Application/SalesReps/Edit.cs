using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.SalesReps
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public string SalesRepCode { get; set; }
            public int AssignedAreaId { get; set; }
            public int AssignedStoreId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserId).GreaterThan(0);
                RuleFor(x => x.AssignedAreaId).GreaterThan(0);
                RuleFor(x => x.AssignedStoreId).GreaterThan(0);
            }
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
                var salesRep = await _context.SalesReps.FindAsync(request.Id);

                if (salesRep == null)
                    throw new RestException(HttpStatusCode.NotFound, new { salesRep = "Not Found" });

                salesRep.UserId = request.UserId == 0 ? salesRep.UserId : request.UserId;
                salesRep.AssignedAreaId = request.AssignedAreaId == 0 ? salesRep.AssignedAreaId : request.AssignedAreaId;
                salesRep.AssignedStoreId = request.AssignedStoreId == 0 ? salesRep.AssignedStoreId : request.AssignedStoreId;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}