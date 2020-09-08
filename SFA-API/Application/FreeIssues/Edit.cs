using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.FreeIssues
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string FreeIssueCode { get; set; }
            public int ExtraQuantity { get; set; }
            public int MinimumQuantity { get; set; }
            public bool IsCustomer { get; set; }
            public bool IsShopOwner { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
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
                var freeIssue = await _context.FreeIssues.FindAsync(request.Id);

                if (freeIssue == null)
                    throw new RestException(HttpStatusCode.NotFound, new { freeIssue = "Not Found" });

                freeIssue.ExtraQuantity = request.ExtraQuantity;
                freeIssue.MinimumQuantity = request.MinimumQuantity;
                freeIssue.IsCustomer = request.IsCustomer;
                freeIssue.IsShopOwner = request.IsShopOwner;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}