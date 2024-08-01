# syntax=docker/dockerfile:1

FROM golang:1.21.5

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

##ENV DEV_ADDRESS=":8080"
##ENV DEV_SERVER='(localdb)\PracticeProjectsDb'
##ENV DEV_PORT='1433'
##ENV USER="web"
##ENV PASSWORD="strongpassword"
##ENV DATABASE="MyFitnessAibouDB"
##ENV SECRET="u46IpCV9y5Vlur8YvODJEhgOY8m9JVE4"

RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-gs-ping ./cmd/api/main.go

EXPOSE 8080

CMD ["/docker-gs-ping"]