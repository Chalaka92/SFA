using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserSpecificDetails
{
    public class ListByLoggedUser
    {
        public class Query : IRequest<List<UserSpecificDetail>>
        {
            public string LoginEmail { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserSpecificDetail>>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _context = context;
                _userManager = userManager;
            }

            public async Task<List<UserSpecificDetail>> Handle(Query request, CancellationToken cancellationToken)
            {
                var loggedUser = await _userManager.FindByEmailAsync(request.LoginEmail);

                if (loggedUser == null)
                    throw new RestException(HttpStatusCode.NotFound, new { loggedUser = "Not Found" });

                var userDetails = await _context.UserDetails.FindAsync(loggedUser.Id);

                if (userDetails == null)
                    throw new RestException(HttpStatusCode.NotFound, new { userDetails = "Not Found" });

                var userSpecificDetails = await _context.UserSpecificDetails.Where(x => x.UserId == userDetails.Id).ToListAsync();
                return userSpecificDetails;
            }
        }

    }
}