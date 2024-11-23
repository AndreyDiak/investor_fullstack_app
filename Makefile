dev:
	docker compose -f .docker-compose.yaml up -d --remove-orphans
	cd ui && npm run docker-dev

deps:
	cd kit && npm install
	cd nestjs && npm install
	cd ui && npm install
