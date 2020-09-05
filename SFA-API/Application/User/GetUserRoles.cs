using Application.Errors;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class GetUserRoles
    {
        public class Query : IRequest<List<UserRole>> { }

        public class Handler
        {
            public Handler()
            {
            }

            public List<UserRole> Handle(Query request, CancellationToken cancellationToken)
            {
                var roles = Enum.GetValues(typeof(AccountRole)).Cast<AccountRole>().ToList();

                if (roles == null)
                    throw new RestException(HttpStatusCode.NotFound, new { roles = "Not Found" });

                var returnRoles = new List<UserRole>();
                roles.ForEach(x =>
                {
                    var role = new UserRole
                    {
                        Id = (int)Enum.Parse(typeof(AccountRole), x.ToString()),
                        Name = x.ToString()
                    };
                    returnRoles.Add(role);
                });

                return returnRoles;
            }
        }
    }
}