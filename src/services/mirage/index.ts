import { ActiveModelSerializer, Factory, Model, Response, createServer } from 'miragejs'
import { faker } from '@faker-js/faker';

type User = {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer
        },
        
        models: {
            user: Model.extend<Partial<User>>({})
        },

        factories: {
            // gerar dados em massa
            user: Factory.extend({
                name() {
                    return faker.person.fullName();
                },
                email() {
                    return faker.internet.email().toLowerCase()
                },
                createdAt() {
                    return faker.date.anytime()
                },
            })
        },

        seeds(server) {
            server.createList('user', 200)
        },

        routes() {
            this.namespace = 'api';
            this.timing = 750; // delay de 750s

            this.get('/users', function (schema, request) {
                const { page = 1, perPage = 10 } = request.queryParams

                const total = schema.all('user').length

                const pageStart = (Number(page) - 1) * Number(perPage)
                const pageEnd = pageStart + Number(perPage)

                const users = this.serialize(schema.all('user'))
                    .users.slice(pageStart, pageEnd)

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                )
            });

            this.get('users/:id')
            this.post('/users');

            this.namespace = '';
            this.passthrough();
        },
    })

    return server
}