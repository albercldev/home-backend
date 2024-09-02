create table common.deployment
(
    uuid             varchar default gen_random_uuid() not null
        constraint application_pk
            primary key,
    name             varchar                           not null,
    repository       varchar                           not null,
    repository_owner varchar                           not null,
    constraint application_repository_uk
        unique (repository, repository_owner)
);
