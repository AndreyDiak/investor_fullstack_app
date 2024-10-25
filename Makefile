dev:
	docker compose -f .docker-compose.yaml up -d --remove-orphans
	cd ui && npm run docker-dev
