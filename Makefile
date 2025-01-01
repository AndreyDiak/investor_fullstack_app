dev:
	# docker compose -f .docker-compose.yaml up -d --remove-orphans
	cd nestjs && npm run dev
	cd ui && npm run dev
