variable "project_name" {
  description = "Repository or service name."
  type        = string
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
}

variable "aws_region" {
  description = "AWS region used for this environment."
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type for the app host."
  type        = string
  default     = "t3.small"
}

variable "app_port" {
  description = "Public application port."
  type        = number
  default     = 3080
}

variable "ssh_allowed_cidrs" {
  description = "CIDRs allowed to access SSH."
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "app_allowed_cidrs" {
  description = "CIDRs allowed to access the app."
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "ssh_public_key" {
  description = "Public key injected by Jenkins from the environment-specific SSH credential."
  type        = string
  sensitive   = true
}
