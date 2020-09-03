using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ShopCategories
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string ShopCategoryCode { get; set; }
            public decimal MaximumDebtAmount { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
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
                var shopCategory = await _context.ShopCategories.FindAsync(request.Id);

                if (shopCategory == null)
                    throw new RestException(HttpStatusCode.NotFound, new { shopCategory = "Not Found" });

                shopCategory.Name = request.Name ?? shopCategory.Name;
                shopCategory.Description = request.Description ?? shopCategory.Description;
                shopCategory.MaximumDebtAmount = request.MaximumDebtAmount == 0 ? shopCategory.MaximumDebtAmount : request.MaximumDebtAmount;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}