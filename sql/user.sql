create table common."user"
(
    uuid          varchar default gen_random_uuid() not null
        constraint user_pk
            primary key,
    username      varchar                           not null
        constraint user_username_uk
            unique,
    email         varchar                           not null
        constraint user_email_uk
            unique,
    password_hash varchar,
    roles         varchar,
    github_id     varchar
);

alter table common."user"
    owner to postgres;

