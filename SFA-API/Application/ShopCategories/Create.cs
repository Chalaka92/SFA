using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ShopCategories
{
    public class Create
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var shopCategory = _mapper.Map<Command, ShopCategory>(request);

                var shopCategoryCode = "scat_" + "01";

                if (await _context.ShopCategories.AnyAsync())
                {
                    shopCategoryCode = "scat_" + (_context.ShopCategories.AsEnumerable()
                        .Max(x => Convert.ToInt32(x.ShopCategoryCode.Substring(x.ShopCategoryCode.Length - 2, 2))) + 1).ToString("D2");
                }
                shopCategory.ShopCategoryCode = shopCategoryCode;

                await _context.ShopCategories.AddAsync(shopCategory);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new System.Exception("Problem saving changes");
            }
        }
    }
}