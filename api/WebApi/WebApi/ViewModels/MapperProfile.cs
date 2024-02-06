﻿using AutoMapper;
using DB.Models;
using DTO;
using DTO.Permissions;
using Microsoft.AspNetCore.Identity;
using Models;
using WebApi.ViewModels.Account;

namespace WebApi.ViewModels;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        MapEntitiesToDtos();
        MapDtosToViewModels();
    }

    public void MapEntitiesToDtos()
    {
        // Users
        CreateMap<EntityUser, DtoUser>()
            .ForMember(trg => trg.Roles, map => map.Ignore());
        CreateMap<DtoUser, EntityUser>()
            .ForMember(trg => trg.Roles, map => map.Ignore())
            .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));

        // Roles
        CreateMap<EntityRole, DtoRole>()
            .ForMember(trg => trg.UsersCount, map => map.MapFrom(src => src.Users != null ? src.Users.Count : 0))
            .ForMember(trg => trg.Permissions, map => map.MapFrom(src => src.Claims));
        CreateMap<DtoRole, EntityRole>()
            .ForMember(d => d.Id, map => map.Condition(src => src.Id != null));
        CreateMap<IdentityRoleClaim<string>, ApplicationPermission>()
            .ConvertUsing(s => ApplicationPermissions.GetPermissionByValue(s.ClaimValue));
    }

    public void MapDtosToViewModels()
    {
        // Users
        CreateMap<DtoUser, UserViewModel>()
            .ReverseMap();

        CreateMap<DtoUser, UserEditViewModel>()
            .ReverseMap();
        
        // Roles
        CreateMap<DtoRole, RoleViewModel>()
            .ReverseMap();
        CreateMap<ApplicationPermission, PermissionViewModel>()
            .ReverseMap();
    }
}
