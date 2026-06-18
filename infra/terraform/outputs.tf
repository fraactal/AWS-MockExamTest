output "instance_id" {
  value       = aws_instance.app.id
  description = "EC2 instance ID for the environment."
}

output "instance_public_ip" {
  value       = aws_instance.app.public_ip
  description = "Public IP used by Jenkins to deploy."
}

output "instance_public_dns" {
  value       = aws_instance.app.public_dns
  description = "Public DNS used by Jenkins to deploy."
}

output "application_url" {
  value       = "http://${aws_instance.app.public_dns}:${var.app_port}"
  description = "Application URL for the environment."
}
