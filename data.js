/* ════════════════════════════════════════════════════════
   data.js  —  All your portfolio content lives here.
   Edit this file to update skills, projects, articles,
   and social links without touching any other file.
   ════════════════════════════════════════════════════════ */

/* ── SKILLS ──────────────────────────────────────────────
   Fields: name, icon (emoji), level (text label), pct (0-100)
   ──────────────────────────────────────────────────────── */
const SKILLS = [
  { name: 'AWS',            icon: '☁️',  level: 'Advanced',     pct: 85 },
  { name: 'Linux',          icon: '🐧',  level: 'Advanced',     pct: 88 },
  { name: 'Docker',         icon: '🐳',  level: 'Proficient',   pct: 82 },
  { name: 'Kubernetes',     icon: '☸️',  level: 'Intermediate', pct: 70 },
  { name: 'CI/CD',          icon: '🔁',  level: 'Advanced',     pct: 84 },
  { name: 'Git & GitHub',   icon: '🐙',  level: 'Proficient',   pct: 90 },
  { name: 'Bash Scripting', icon: '📜',  level: 'Proficient',   pct: 78 },
  { name: 'Networking',     icon: '🌐',  level: 'Intermediate', pct: 68 },
  { name: 'Terraform',      icon: '🏗️',  level: 'Learning',     pct: 55 },
];

/* ── PROJECTS ────────────────────────────────────────────
   Fields: icon (emoji), title, desc, badges (array of strings)
   ──────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    icon: '🏗️',
    title: 'AWS VPC Architecture',
    desc: 'Designed and deployed a secure VPC with public/private subnets, route tables, and internet gateway for a production workload.',
    badges: ['AWS', 'VPC', 'Networking', 'EC2'],
  },
  {
    icon: '⚙️',
    title: 'Apache Web Server Automation',
    desc: 'Automated deployment of Apache server using shell scripts handling package installation, configuration, and health checks.',
    badges: ['Bash', 'Apache', 'EC2', 'Linux'],
  },
  {
    icon: '🔒',
    title: 'Linux Hardening Script',
    desc: 'Developed a security hardening script for CentOS to enforce compliance, patch vulnerabilities, and improve system security posture.',
    badges: ['CentOS', 'Security', 'Bash', 'Compliance'],
  },
  {
    icon: '🚀',
    title: 'CI/CD Pipeline — ECS',
    desc: 'Implemented end-to-end CI/CD pipeline for Dockerized applications using AWS CodePipeline, Amazon ECR, and Amazon ECS.',
    badges: ['CodePipeline', 'ECR', 'ECS', 'Docker'],
  },
  {
    icon: '⎈',
    title: 'Kubernetes on AWS EKS',
    desc: 'Deployed and managed a two-tier Flask application on AWS EKS with load balancing, persistent storage, and high availability.',
    badges: ['K8s', 'EKS', 'Flask', 'Load Balancer'],
  },
  {
    icon: '🌐',
    title: 'GitHub Actions Deployment',
    desc: 'Configured automated deployment workflows using GitHub Actions to streamline application delivery on EC2 with zero-downtime deploys.',
    badges: ['GitHub Actions', 'EC2', 'Automation', 'Nginx'],
  },
];

/* ── ARTICLES (carousel slides) ──────────────────────────
   Fields: meta (date/category label), title, desc, link (URL)
   ──────────────────────────────────────────────────────── */
const ARTICLES = [
  {
    meta: 'May 2025 · AWS',
    title: 'Building a Production VPC from Scratch',
    desc: 'A step-by-step guide to designing a multi-tier VPC on AWS with proper security groups, NAT gateways, and route table configurations.',
    link: '#article',
  },
  {
    meta: 'March 2025 · CI/CD',
    title: 'Dockerizing Your App with GitHub Actions',
    desc: 'Automating your Docker build, push to ECR, and deploy to ECS using GitHub Actions — a real-world walkthrough with IAM best practices.',
    link: '#article',
  },
  {
    meta: 'January 2025 · Security',
    title: 'Linux Hardening: A Practical Guide',
    desc: 'Key steps to harden a CentOS/Ubuntu server including SSH lockdown, firewall rules, auditd configuration, and CIS benchmark compliance.',
    link: '#article',
  },
  {
    meta: 'November 2024 · Kubernetes',
    title: 'Running Flask on AWS EKS',
    desc: 'Deploying a two-tier Flask + PostgreSQL app on AWS EKS, configuring Ingress, Persistent Volumes, and Horizontal Pod Autoscaling.',
    link: '#article',
  },
];

/* ── SOCIAL LINKS ────────────────────────────────────────
   Fields: icon (emoji), label, sub (handle/url text), url
   ──────────────────────────────────────────────────────── */
const SOCIALS = [
  { icon: '💼',  label: 'LinkedIn',    sub: '/in/asthakwh',   url: 'https://linkedin.com/in/asthakwh' },
  { icon: '🐙',  label: 'GitHub',      sub: '/asthakwh',      url: 'https://github.com/asthakwh'    },
  { icon: '📸',  label: 'Instagram',   sub: '@asthakwh',      url: 'https://instagram.com/asthakwh' },
  { icon: '𝕏',  label: 'Twitter / X', sub: '@asthakwh',      url: 'https://twitter.com/asthakwh'   },

  { icon: '▶️',  label: 'YouTube',    sub: 'Travelling Videos & Fun', url: 'https://youtube.com/@asthakwh' },
  { icon: '✈️',  label: 'Telegram',   sub: 'Channel with 3k subcribers',   url: 'https://t.me/mcsawithus' },
  { icon: '📧',  label: 'Email',      sub: 'Open to DevOps roles',   url: 'mailto:asthakh22@gmail.com' },

];
