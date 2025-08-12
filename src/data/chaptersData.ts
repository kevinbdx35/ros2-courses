export interface ChapterData {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  topics: string[];
  content: {
    introduction: string;
    sections: ChapterSection[];
  };
}

export interface ChapterSection {
  id: string;
  title: string;
  content: string;
  codeExample?: CodeExample;
  quiz?: QuizData;
}

export interface CodeExample {
  code: string;
  language: string;
  title?: string;
  description?: string;
}

export interface QuizData {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export const chaptersData: ChapterData[] = [
  {
    id: 1,
    title: "Installation et Configuration de ROS 2",
    description: "Apprenez à installer ROS 2 sur votre système et à configurer votre environnement de développement.",
    duration: "30 min",
    difficulty: "Débutant",
    topics: ["Installation", "Configuration", "Environnement", "Workspace"],
    content: {
      introduction: "ROS 2 (Robot Operating System 2) est un framework middleware open-source pour le développement robotique. Dans ce chapitre, nous allons apprendre à l'installer et le configurer correctement.",
      sections: [
        {
          id: "installation",
          title: "Installation de ROS 2",
          content: "Pour installer ROS 2 sur Ubuntu 22.04, nous utiliserons les packages officiels. Voici les étapes détaillées pour une installation complète.",
          codeExample: {
            code: `# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation des dépendances
sudo apt install software-properties-common curl -y

# Ajout du dépôt ROS 2
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Installation de ROS 2 Humble (version LTS)
sudo apt update
sudo apt install ros-humble-desktop python3-argcomplete -y

# Installation des outils de développement
sudo apt install python3-pip python3-colcon-common-extensions -y`,
            language: "bash",
            title: "Installation ROS 2 Humble",
            description: "Script d'installation complète pour Ubuntu 22.04"
          }
        },
        {
          id: "configuration",
          title: "Configuration de l'environnement",
          content: "Après l'installation, il faut configurer l'environnement pour utiliser ROS 2. Cette configuration permet d'accéder aux commandes et outils ROS 2.",
          codeExample: {
            code: `# Configuration automatique dans .bashrc
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc

# Vérification de l'installation
ros2 --help

# Configuration du workspace (optionnel mais recommandé)
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
colcon build --symlink-install

# Sourcing du workspace
echo "source ~/ros2_ws/install/setup.bash" >> ~/.bashrc`,
            language: "bash",
            title: "Configuration de l'environnement",
            description: "Configuration automatique de l'environnement ROS 2"
          }
        },
        {
          id: "verification",
          title: "Vérification de l'installation",
          content: "Pour s'assurer que ROS 2 est correctement installé, nous allons exécuter quelques commandes de test.",
          codeExample: {
            code: `# Test des outils de base
ros2 doctor

# Liste des packages installés
ros2 pkg list

# Test de communication entre nodes
# Terminal 1:
ros2 run demo_nodes_cpp talker

# Terminal 2 (dans un nouveau terminal):
ros2 run demo_nodes_py listener`,
            language: "bash",
            title: "Tests de vérification",
            description: "Commandes pour vérifier le bon fonctionnement de ROS 2"
          },
          quiz: {
            question: "Quelle commande permet de vérifier l'état de votre installation ROS 2 ?",
            options: [
              { id: "a", text: "ros2 check", isCorrect: false },
              { id: "b", text: "ros2 doctor", isCorrect: true },
              { id: "c", text: "ros2 status", isCorrect: false },
              { id: "d", text: "ros2 verify", isCorrect: false }
            ],
            explanation: "La commande 'ros2 doctor' permet de diagnostiquer les problèmes potentiels de votre installation ROS 2 et de vérifier que tout fonctionne correctement."
          }
        }
      ]
    }
  },
  {
    id: 2,
    title: "Création et Exécution d'un Node Simple",
    description: "Découvrez comment créer votre premier node ROS 2 en Python et comprendre les concepts fondamentaux.",
    duration: "45 min",
    difficulty: "Débutant",
    topics: ["Nodes", "Python", "Publisher", "Subscriber", "Messages"],
    content: {
      introduction: "Un node (nœud) est l'unité de base d'un système ROS 2. C'est un processus qui effectue des calculs, communique avec d'autres nodes, et peut publier ou s'abonner à des topics.",
      sections: [
        {
          id: "node-concept",
          title: "Qu'est-ce qu'un Node ?",
          content: "Un node ROS 2 est un participant dans le graphe ROS 2. Chaque node peut publier des messages, s'abonner à des topics, fournir des services, ou appeler des actions. Les nodes permettent de modulariser votre application robotique."
        },
        {
          id: "first-node",
          title: "Création du premier Node",
          content: "Créons un node simple qui publie des messages sur un topic. Ce node servira de base pour comprendre la structure d'un programme ROS 2.",
          codeExample: {
            code: `#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        
        # Création du publisher
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        
        # Timer pour publier périodiquement
        timer_period = 0.5  # secondes
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1


def main(args=None):
    rclpy.init(args=args)
    
    minimal_publisher = MinimalPublisher()
    
    rclpy.spin(minimal_publisher)
    
    # Nettoyage
    minimal_publisher.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
            language: "python",
            title: "Premier Node Publisher",
            description: "Node simple qui publie des messages sur un topic"
          }
        },
        {
          id: "subscriber-node",
          title: "Création d'un Subscriber",
          content: "Maintenant, créons un node qui s'abonne aux messages publiés par notre premier node. Cela illustre la communication de base entre nodes.",
          codeExample: {
            code: `#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('minimal_subscriber')
        
        # Création du subscriber
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prévient l'avertissement unused variable

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')


def main(args=None):
    rclpy.init(args=args)
    
    minimal_subscriber = MinimalSubscriber()
    
    rclpy.spin(minimal_subscriber)
    
    # Nettoyage
    minimal_subscriber.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
            language: "python",
            title: "Node Subscriber",
            description: "Node qui s'abonne aux messages d'un topic"
          }
        },
        {
          id: "execution",
          title: "Exécution des Nodes",
          content: "Pour exécuter nos nodes, nous utilisons la commande ros2 run. Voici comment lancer et tester notre communication.",
          codeExample: {
            code: `# Dans un premier terminal, lancer le publisher
chmod +x minimal_publisher.py
ros2 run my_package minimal_publisher.py

# Dans un second terminal, lancer le subscriber
chmod +x minimal_subscriber.py
ros2 run my_package minimal_subscriber.py

# Pour voir les topics actifs
ros2 topic list

# Pour voir les messages en temps réel
ros2 topic echo /topic

# Pour voir les informations du topic
ros2 topic info /topic`,
            language: "bash",
            title: "Commandes d'exécution",
            description: "Comment lancer et monitorer les nodes ROS 2"
          },
          quiz: {
            question: "Quelle méthode est utilisée pour créer un publisher dans un node ROS 2 ?",
            options: [
              { id: "a", text: "self.create_publisher()", isCorrect: true },
              { id: "b", text: "self.make_publisher()", isCorrect: false },
              { id: "c", text: "self.new_publisher()", isCorrect: false },
              { id: "d", text: "self.add_publisher()", isCorrect: false }
            ],
            explanation: "La méthode 'create_publisher()' est la méthode standard pour créer un publisher dans un node ROS 2. Elle prend en paramètres le type de message, le nom du topic et la taille de la queue."
          }
        }
      ]
    }
  },
  {
    id: 3,
    title: "Communication via Topics",
    description: "Maîtrisez la communication asynchrone entre nodes ROS 2 à travers les topics et les messages.",
    duration: "60 min",
    difficulty: "Intermédiaire",
    topics: ["Topics", "Messages", "QoS", "Communication", "Multi-threading"],
    content: {
      introduction: "Les topics sont le principal mécanisme de communication dans ROS 2. Ils permettent une communication asynchrone de type publish/subscribe entre les nodes.",
      sections: [
        {
          id: "topic-concepts",
          title: "Concepts des Topics",
          content: "Un topic est un canal de communication nommé par lequel les nodes peuvent échanger des messages. Les publishers envoient des messages sur un topic, et les subscribers reçoivent ces messages."
        },
        {
          id: "custom-messages",
          title: "Messages personnalisés",
          content: "Créons nos propres types de messages pour des communications plus spécifiques à notre application robotique.",
          codeExample: {
            code: `# Fichier: msg/PersonData.msg
string name
int32 age
float32 height
bool is_student

# Fichier: msg/RobotStatus.msg
string robot_id
geometry_msgs/Pose pose
float32 battery_level
string[] active_sensors
builtin_interfaces/Time last_update`,
            language: "text",
            title: "Définition de messages personnalisés",
            description: "Exemples de définition de messages ROS 2"
          }
        },
        {
          id: "advanced-publisher",
          title: "Publisher avancé avec QoS",
          content: "Implémentons un publisher plus sophistiqué qui utilise les paramètres de Quality of Service (QoS) pour contrôler la livraison des messages.",
          codeExample: {
            code: `#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from rclpy.qos import QoSProfile, ReliabilityPolicy, DurabilityPolicy
from sensor_msgs.msg import Image
from geometry_msgs.msg import Twist
import time


class AdvancedPublisher(Node):

    def __init__(self):
        super().__init__('advanced_publisher')
        
        # QoS pour messages critiques (commandes de mouvement)
        reliable_qos = QoSProfile(
            reliability=ReliabilityPolicy.RELIABLE,
            durability=DurabilityPolicy.TRANSIENT_LOCAL,
            depth=10
        )
        
        # QoS pour données temps réel (images)
        best_effort_qos = QoSProfile(
            reliability=ReliabilityPolicy.BEST_EFFORT,
            depth=5
        )
        
        # Publishers avec différents QoS
        self.cmd_publisher = self.create_publisher(
            Twist, 
            'cmd_vel', 
            reliable_qos
        )
        
        self.image_publisher = self.create_publisher(
            Image, 
            'camera/image', 
            best_effort_qos
        )
        
        # Timers pour publication périodique
        self.cmd_timer = self.create_timer(0.1, self.publish_cmd_vel)
        self.image_timer = self.create_timer(0.033, self.publish_image)
        
        self.count = 0

    def publish_cmd_vel(self):
        msg = Twist()
        # Mouvement circulaire simple
        msg.linear.x = 1.0
        msg.angular.z = 0.5
        
        self.cmd_publisher.publish(msg)
        self.get_logger().info('Published cmd_vel')

    def publish_image(self):
        msg = Image()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = "camera_frame"
        msg.height = 480
        msg.width = 640
        msg.encoding = "rgb8"
        msg.step = msg.width * 3
        # Données d'image simulées
        msg.data = [0] * (msg.height * msg.step)
        
        self.image_publisher.publish(msg)
        
        if self.count % 30 == 0:  # Log toutes les secondes
            self.get_logger().info('Published image')
        self.count += 1


def main(args=None):
    rclpy.init(args=args)
    
    advanced_publisher = AdvancedPublisher()
    
    try:
        rclpy.spin(advanced_publisher)
    except KeyboardInterrupt:
        pass
    
    advanced_publisher.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
            language: "python",
            title: "Publisher avec QoS",
            description: "Publisher avancé utilisant différents profils QoS"
          }
        },
        {
          id: "multi-topic-subscriber",
          title: "Subscriber multi-topics",
          content: "Créons un node qui s'abonne à plusieurs topics simultanément et traite différents types de messages.",
          codeExample: {
            code: `#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from rclpy.executors import MultiThreadedExecutor
from std_msgs.msg import String
from geometry_msgs.msg import Twist
from sensor_msgs.msg import Image, LaserScan
import threading


class MultiTopicSubscriber(Node):

    def __init__(self):
        super().__init__('multi_topic_subscriber')
        
        # Subscribers pour différents types de données
        self.string_sub = self.create_subscription(
            String,
            'chatter',
            self.string_callback,
            10
        )
        
        self.cmd_vel_sub = self.create_subscription(
            Twist,
            'cmd_vel',
            self.cmd_vel_callback,
            10
        )
        
        self.image_sub = self.create_subscription(
            Image,
            'camera/image',
            self.image_callback,
            5  # Queue plus petite pour les images
        )
        
        self.laser_sub = self.create_subscription(
            LaserScan,
            'scan',
            self.laser_callback,
            10
        )
        
        # Compteurs pour statistiques
        self.message_counts = {
            'string': 0,
            'cmd_vel': 0,
            'image': 0,
            'laser': 0
        }
        
        # Timer pour afficher les statistiques
        self.stats_timer = self.create_timer(5.0, self.print_stats)

    def string_callback(self, msg):
        self.message_counts['string'] += 1
        self.get_logger().debug(f'Received string: {msg.data}')

    def cmd_vel_callback(self, msg):
        self.message_counts['cmd_vel'] += 1
        self.get_logger().debug(
            f'Received cmd_vel: linear={msg.linear.x:.2f}, '
            f'angular={msg.angular.z:.2f}'
        )

    def image_callback(self, msg):
        self.message_counts['image'] += 1
        self.get_logger().debug(
            f'Received image: {msg.width}x{msg.height} '
            f'encoding={msg.encoding}'
        )

    def laser_callback(self, msg):
        self.message_counts['laser'] += 1
        min_range = min([r for r in msg.ranges if r > msg.range_min])
        self.get_logger().debug(
            f'Received laser scan: {len(msg.ranges)} points, '
            f'min_range={min_range:.2f}m'
        )

    def print_stats(self):
        self.get_logger().info('Message statistics:')
        for topic, count in self.message_counts.items():
            self.get_logger().info(f'  {topic}: {count} messages')


def main(args=None):
    rclpy.init(args=args)
    
    node = MultiTopicSubscriber()
    
    # Utilisation d'un executor multi-threaded pour traiter
    # plusieurs callbacks simultanément
    executor = MultiThreadedExecutor(num_threads=4)
    executor.add_node(node)
    
    try:
        executor.spin()
    except KeyboardInterrupt:
        pass
    
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
            language: "python",
            title: "Subscriber multi-topics",
            description: "Node qui traite plusieurs types de messages simultanément"
          },
          quiz: {
            question: "Quelle politique QoS garantit que tous les messages seront délivrés, même avec de la latence ?",
            options: [
              { id: "a", text: "BEST_EFFORT", isCorrect: false },
              { id: "b", text: "RELIABLE", isCorrect: true },
              { id: "c", text: "FAST_DELIVERY", isCorrect: false },
              { id: "d", text: "IMMEDIATE", isCorrect: false }
            ],
            explanation: "La politique RELIABLE garantit que tous les messages seront délivrés, quitte à les retransmettre en cas de perte. BEST_EFFORT privilégie la vitesse au détriment de la garantie de livraison."
          }
        }
      ]
    }
  },
  {
    id: 4,
    title: "Services et Actions dans ROS 2",
    description: "Apprenez les mécanismes de communication synchrone et asynchrone pour les tâches longues.",
    duration: "75 min",
    difficulty: "Intermédiaire",
    topics: ["Services", "Actions", "Clients", "Serveurs", "Feedback"],
    content: {
      introduction: "Les services et actions complètent les topics en fournissant des mécanismes de communication synchrone (services) et asynchrone avec feedback (actions) pour des tâches spécifiques.",
      sections: [
        {
          id: "services-intro",
          title: "Introduction aux Services",
          content: "Un service ROS 2 fournit une communication synchrone request/response entre nodes. Le client envoie une requête et attend la réponse du serveur."
        },
        {
          id: "service-server",
          title: "Création d'un Service Server",
          content: "Implémentons un service qui calcule la somme de deux nombres. Ce service simple illustre les concepts fondamentaux.",
          codeExample: {
            code: `#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts


class AddTwoIntsServer(Node):

    def __init__(self):
        super().__init__('add_two_ints_server')
        
        # Création du service
        self.srv = self.create_service(
            AddTwoInts, 
            'add_two_ints', 
            self.add_two_ints_callback
        )
        
        self.get_logger().info('Service add_two_ints ready')

    def add_two_ints_callback(self, request, response):
        # Traitement de la requête
        response.sum = request.a + request.b
        
        self.get_logger().info(
            f'Request: {request.a} + {request.b} = {response.sum}'
        )
        
        return response


def main(args=None):
    rclpy.init(args=args)
    
    service_server = AddTwoIntsServer()
    
    try:
        rclpy.spin(service_server)
    except KeyboardInterrupt:
        pass
    
    service_server.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
            language: "python",
            title: "Service Server",
            description: "Serveur de service simple pour additionner deux nombres"
          }
        },
        {
          id: "service-client",
          title: "Création d'un Service Client",
          content: "Maintenant, créons un client qui utilise notre service pour effectuer des calculs.",
          codeExample: {
            code: `#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts
import sys


class AddTwoIntsClient(Node):

    def __init__(self):
        super().__init__('add_two_ints_client')
        
        # Création du client
        self.client = self.create_client(AddTwoInts, 'add_two_ints')
        
        # Attendre que le service soit disponible
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service not available, waiting...')

    def send_request(self, a, b):
        # Création de la requête
        request = AddTwoInts.Request()
        request.a = a
        request.b = b
        
        self.get_logger().info(f'Sending request: {a} + {b}')
        
        # Envoi asynchrone de la requête
        future = self.client.call_async(request)
        return future


def main(args=None):
    rclpy.init(args=args)
    
    if len(sys.argv) != 3:
        print("Usage: add_two_ints_client <a> <b>")
        return
    
    client = AddTwoIntsClient()
    
    try:
        a = int(sys.argv[1])
        b = int(sys.argv[2])
        
        future = client.send_request(a, b)
        
        # Attendre la réponse
        rclpy.spin_until_future_complete(client, future)
        
        if future.result() is not None:
            response = future.result()
            client.get_logger().info(f'Result: {response.sum}')
        else:
            client.get_logger().error('Service call failed')
            
    except ValueError:
        client.get_logger().error('Arguments must be integers')
    except KeyboardInterrupt:
        pass
    
    client.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
            language: "python",
            title: "Service Client",
            description: "Client qui utilise le service d'addition"
          }
        },
        {
          id: "action-server",
          title: "Action Server pour tâches longues",
          content: "Les actions sont parfaites pour les tâches qui prennent du temps. Créons un action server qui simule un processus de navigation.",
          codeExample: {
            code: `#!/usr/bin/env python3

import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node
from action_tutorials_interfaces.action import Fibonacci
import time


class FibonacciActionServer(Node):

    def __init__(self):
        super().__init__('fibonacci_action_server')
        
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback
        )
        
        self.get_logger().info('Fibonacci action server ready')

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')
        
        # Initialisation
        feedback_msg = Fibonacci.Feedback()
        feedback_msg.partial_sequence = [0, 1]
        
        # Exécution de la tâche avec feedback périodique
        for i in range(1, goal_handle.request.order):
            # Vérifier si l'annulation a été demandée
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                self.get_logger().info('Goal canceled')
                return Fibonacci.Result()
            
            # Calcul du prochain nombre de Fibonacci
            next_fib = (
                feedback_msg.partial_sequence[i] + 
                feedback_msg.partial_sequence[i-1]
            )
            feedback_msg.partial_sequence.append(next_fib)
            
            self.get_logger().info(f'Feedback: {feedback_msg.partial_sequence}')
            
            # Publier le feedback
            goal_handle.publish_feedback(feedback_msg)
            
            # Simulation du temps de traitement
            time.sleep(1)
        
        # Marquer comme réussi et retourner le résultat
        goal_handle.succeed()
        
        result = Fibonacci.Result()
        result.sequence = feedback_msg.partial_sequence
        
        self.get_logger().info(f'Goal succeeded! Result: {result.sequence}')
        
        return result


def main(args=None):
    rclpy.init(args=args)
    
    fibonacci_action_server = FibonacciActionServer()
    
    try:
        rclpy.spin(fibonacci_action_server)
    except KeyboardInterrupt:
        pass
    
    fibonacci_action_server.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()`,
            language: "python",
            title: "Action Server",
            description: "Serveur d'action pour calculer la séquence de Fibonacci"
          }
        },
        {
          id: "action-client",
          title: "Action Client avec Feedback",
          content: "Créons un client d'action qui peut envoyer des goals, recevoir du feedback et gérer les résultats.",
          codeExample: {
            code: `#!/usr/bin/env python3

import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node
from action_tutorials_interfaces.action import Fibonacci


class FibonacciActionClient(Node):

    def __init__(self):
        super().__init__('fibonacci_action_client')
        
        self._action_client = ActionClient(
            self, 
            Fibonacci, 
            'fibonacci'
        )

    def send_goal(self, order):
        goal_msg = Fibonacci.Goal()
        goal_msg.order = order
        
        # Attendre que le serveur soit disponible
        self._action_client.wait_for_server()
        
        self.get_logger().info(f'Sending goal: order = {order}')
        
        # Envoyer le goal avec callbacks
        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback
        )
        
        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        
        if not goal_handle.accepted:
            self.get_logger().info('Goal rejected')
            return
        
        self.get_logger().info('Goal accepted')
        
        # Obtenir le résultat
        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def get_result_callback(self, future):
        result = future.result().result
        self.get_logger().info(f'Result: {result.sequence}')
        
        # Arrêter le node
        rclpy.shutdown()

    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg.feedback
        self.get_logger().info(
            f'Received feedback: {feedback.partial_sequence}'
        )


def main(args=None):
    rclpy.init(args=args)
    
    action_client = FibonacciActionClient()
    
    # Envoyer un goal pour calculer les 10 premiers nombres de Fibonacci
    action_client.send_goal(10)
    
    try:
        rclpy.spin(action_client)
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()`,
            language: "python",
            title: "Action Client",
            description: "Client d'action avec gestion du feedback et des résultats"
          },
          quiz: {
            question: "Quelle est la principale différence entre un service et une action dans ROS 2 ?",
            options: [
              { id: "a", text: "Les services sont plus rapides", isCorrect: false },
              { id: "b", text: "Les actions fournissent du feedback pendant l'exécution", isCorrect: true },
              { id: "c", text: "Les services peuvent être annulés", isCorrect: false },
              { id: "d", text: "Les actions sont synchrones", isCorrect: false }
            ],
            explanation: "Les actions permettent de recevoir du feedback pendant l'exécution de la tâche et peuvent être annulées, contrairement aux services qui sont des appels synchrones simples request/response."
          }
        }
      ]
    }
  },
  {
    id: 5,
    title: "Launch Files - Orchestration de Systèmes",
    description: "Maîtrisez les launch files pour démarrer et configurer des systèmes ROS 2 complexes avec plusieurs nodes.",
    duration: "50 min",
    difficulty: "Avancé",
    topics: ["Launch Files", "Paramètres", "Configuration", "Orchestration", "Déploiement"],
    content: {
      introduction: "Les launch files permettent de démarrer, configurer et orchestrer plusieurs nodes et leurs paramètres en une seule commande. C'est essentiel pour les systèmes robotiques complexes.",
      sections: [
        {
          id: "launch-concepts",
          title: "Concepts des Launch Files",
          content: "Un launch file décrit comment démarrer un ensemble de nodes, leurs paramètres, et leurs interactions. Il peut être écrit en Python, XML, ou YAML."
        },
        {
          id: "basic-launch",
          title: "Launch File de Base",
          content: "Créons un launch file simple qui démarre plusieurs nodes avec leurs configurations.",
          codeExample: {
            code: `#!/usr/bin/env python3

from launch import LaunchDescription
from launch_ros.actions import Node
from launch.actions import DeclareLaunchArgument, LogInfo
from launch.substitutions import LaunchConfiguration


def generate_launch_description():
    return LaunchDescription([
        # Déclaration d'arguments de lancement
        DeclareLaunchArgument(
            'robot_name',
            default_value='robot1',
            description='Name of the robot'
        ),
        
        DeclareLaunchArgument(
            'use_sim_time',
            default_value='false',
            description='Use simulation time'
        ),
        
        # Log d'information
        LogInfo(
            msg=['Launching nodes for robot: ', LaunchConfiguration('robot_name')]
        ),
        
        # Node publisher
        Node(
            package='demo_nodes_py',
            executable='talker',
            name='talker_node',
            namespace=LaunchConfiguration('robot_name'),
            parameters=[{
                'use_sim_time': LaunchConfiguration('use_sim_time')
            }],
            remappings=[
                ('chatter', 'robot_chatter')
            ],
            output='screen'
        ),
        
        # Node subscriber
        Node(
            package='demo_nodes_py',
            executable='listener',
            name='listener_node',
            namespace=LaunchConfiguration('robot_name'),
            parameters=[{
                'use_sim_time': LaunchConfiguration('use_sim_time')
            }],
            remappings=[
                ('chatter', 'robot_chatter')
            ],
            output='screen'
        ),
        
        # Node de monitoring
        Node(
            package='my_package',
            executable='monitor_node',
            name='system_monitor',
            parameters=[{
                'robot_name': LaunchConfiguration('robot_name'),
                'monitoring_frequency': 1.0,
                'log_level': 'INFO'
            }],
            output='screen'
        )
    ])`,
            language: "python",
            title: "Launch File de Base",
            description: "Launch file simple avec paramètres et remappings"
          }
        },
        {
          id: "advanced-launch",
          title: "Launch File Avancé",
          content: "Créons un launch file plus sophistiqué avec conditions, groupes et inclusions d'autres launch files.",
          codeExample: {
            code: `#!/usr/bin/env python3

from launch import LaunchDescription
from launch.actions import (
    DeclareLaunchArgument, 
    IncludeLaunchDescription,
    GroupAction,
    ExecuteProcess,
    TimerAction,
    LogInfo
)
from launch.conditions import IfCondition
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import (
    LaunchConfiguration, 
    ThisLaunchFileDir,
    PathJoinSubstitution,
    FindPackageShare
)
from launch_ros.actions import Node, PushRosNamespace
import os


def generate_launch_description():
    # Déclarations d'arguments
    robot_type_arg = DeclareLaunchArgument(
        'robot_type',
        default_value='mobile',
        choices=['mobile', 'arm', 'quadruped'],
        description='Type of robot to launch'
    )
    
    simulation_arg = DeclareLaunchArgument(
        'simulation',
        default_value='false',
        description='Launch in simulation mode'
    )
    
    robot_name_arg = DeclareLaunchArgument(
        'robot_name',
        default_value='my_robot',
        description='Robot identifier'
    )
    
    # Configuration des chemins
    pkg_share = FindPackageShare('my_robot_bringup').find('my_robot_bringup')
    config_file = PathJoinSubstitution([pkg_share, 'config', 'robot_config.yaml'])
    
    # Groupe pour les nodes de base (toujours lancés)
    base_nodes = GroupAction([
        PushRosNamespace(LaunchConfiguration('robot_name')),
        
        # Node de gestion des paramètres
        Node(
            package='my_robot_core',
            executable='parameter_server',
            name='parameter_server',
            parameters=[config_file],
            output='screen'
        ),
        
        # Node de monitoring système
        Node(
            package='my_robot_core',
            executable='system_monitor',
            name='system_monitor',
            parameters=[{
                'robot_type': LaunchConfiguration('robot_type'),
                'enable_diagnostics': True
            }],
            output='screen'
        )
    ])
    
    # Groupe conditionnel pour la simulation
    simulation_nodes = GroupAction(
        condition=IfCondition(LaunchConfiguration('simulation')),
        actions=[
            LogInfo(msg='Starting simulation nodes...'),
            
            # Lancement du simulateur
            IncludeLaunchDescription(
                PythonLaunchDescriptionSource([
                    PathJoinSubstitution([
                        FindPackageShare('gazebo_ros'), 
                        'launch', 
                        'gazebo.launch.py'
                    ])
                ]),
                launch_arguments={
                    'world': PathJoinSubstitution([
                        pkg_share, 'worlds', 'default.world'
                    ]),
                    'verbose': 'true'
                }.items()
            ),
            
            # Spawner du robot dans Gazebo
            Node(
                package='gazebo_ros',
                executable='spawn_entity.py',
                arguments=[
                    '-topic', 'robot_description',
                    '-entity', LaunchConfiguration('robot_name')
                ],
                output='screen'
            )
        ]
    )
    
    # Groupe pour les nodes spécifiques au type de robot
    mobile_robot_nodes = GroupAction(
        condition=IfCondition(
            [LaunchConfiguration('robot_type'), ' == mobile']
        ),
        actions=[
            Node(
                package='my_mobile_robot',
                executable='navigation_node',
                name='navigation',
                parameters=[{
                    'base_frame': 'base_link',
                    'map_frame': 'map',
                    'max_velocity': 1.0
                }],
                output='screen'
            ),
            
            Node(
                package='my_mobile_robot',
                executable='localization_node',
                name='localization',
                output='screen'
            )
        ]
    )
    
    # Action différée pour démarrer les capteurs
    delayed_sensor_start = TimerAction(
        period=3.0,
        actions=[
            LogInfo(msg='Starting sensors...'),
            
            Node(
                package='my_sensors',
                executable='lidar_node',
                name='lidar',
                parameters=[{
                    'frame_id': 'lidar_link',
                    'scan_frequency': 10.0
                }],
                output='screen'
            ),
            
            Node(
                package='my_sensors',
                executable='camera_node',
                name='camera',
                parameters=[{
                    'frame_id': 'camera_link',
                    'fps': 30
                }],
                output='screen'
            )
        ]
    )
    
    # Script de post-lancement
    post_launch_script = ExecuteProcess(
        cmd=[
            'python3', 
            os.path.join(pkg_share, 'scripts', 'post_launch_setup.py'),
            LaunchConfiguration('robot_name')
        ],
        output='screen'
    )
    
    return LaunchDescription([
        # Arguments
        robot_type_arg,
        simulation_arg,
        robot_name_arg,
        
        # Logs d'information
        LogInfo(msg=['Launching robot: ', LaunchConfiguration('robot_name')]),
        LogInfo(msg=['Robot type: ', LaunchConfiguration('robot_type')]),
        LogInfo(msg=['Simulation mode: ', LaunchConfiguration('simulation')]),
        
        # Groupes de nodes
        base_nodes,
        simulation_nodes,
        mobile_robot_nodes,
        
        # Actions différées
        delayed_sensor_start,
        
        # Script final
        TimerAction(
            period=5.0,
            actions=[post_launch_script]
        )
    ])`,
            language: "python",
            title: "Launch File Avancé",
            description: "Launch file complexe avec conditions, groupes et timing"
          }
        },
        {
          id: "launch-config",
          title: "Configuration avec fichiers YAML",
          content: "Les paramètres peuvent être externalisés dans des fichiers YAML pour faciliter la configuration.",
          codeExample: {
            code: `# Fichier: config/robot_config.yaml
/**:
  ros__parameters:
    # Paramètres globaux
    robot_name: "my_robot"
    robot_type: "mobile"
    
    # Paramètres de navigation
    navigation:
      max_velocity: 1.5
      min_velocity: 0.1
      acceleration_limit: 2.0
      angular_velocity_limit: 1.0
      
    # Paramètres des capteurs
    sensors:
      lidar:
        frame_id: "lidar_link"
        min_angle: -3.14159
        max_angle: 3.14159
        range_min: 0.1
        range_max: 30.0
        frequency: 10.0
        
      camera:
        frame_id: "camera_link"
        width: 640
        height: 480
        fps: 30
        encoding: "bgr8"
        
    # Paramètres de monitoring
    monitoring:
      enable_diagnostics: true
      publish_frequency: 1.0
      log_level: "INFO"
      topics_to_monitor:
        - "/scan"
        - "/cmd_vel" 
        - "/odom"
        - "/camera/image_raw"

# Fichier: config/simulation_config.yaml  
/**:
  ros__parameters:
    # Paramètres spécifiques à la simulation
    use_sim_time: true
    
    # Paramètres Gazebo
    gazebo:
      world_file: "default.world"
      gui: true
      verbose: true
      
    # Paramètres du robot simulé
    robot_model:
      spawn_x: 0.0
      spawn_y: 0.0
      spawn_z: 0.1
      spawn_yaw: 0.0`,
            language: "yaml",
            title: "Fichiers de Configuration YAML",
            description: "Configuration externalisée pour les paramètres ROS 2"
          }
        },
        {
          id: "launch-execution",
          title: "Exécution et Gestion des Launch Files",
          content: "Apprenons comment exécuter et gérer nos launch files avec différentes options.",
          codeExample: {
            code: `# Lancement basique
ros2 launch my_package basic_launch.py

# Lancement avec arguments
ros2 launch my_package robot_launch.py robot_name:=robot1 simulation:=true

# Lancement avec fichier de config personnalisé
ros2 launch my_package robot_launch.py config_file:=/path/to/custom_config.yaml

# Afficher les arguments disponibles
ros2 launch my_package robot_launch.py --show-args

# Mode debug (afficher tous les messages)
ros2 launch my_package robot_launch.py --debug

# Lancement en mode non-interactif
ros2 launch my_package robot_launch.py --noninteractive

# Monitoring des nodes lancés
ros2 node list
ros2 topic list
ros2 service list

# Visualisation du graphe des nodes
rqt_graph

# Monitoring des paramètres
ros2 param list
ros2 param get /robot1/navigation max_velocity

# Arrêt propre
# Ctrl+C dans le terminal du launch
# ou
ros2 lifecycle set /node_name shutdown`,
            language: "bash",
            title: "Commandes de gestion des Launch Files",
            description: "Comment exécuter et monitorer les launch files"
          },
          quiz: {
            question: "Quelle action Launch permet d'exécuter un groupe de nodes seulement si une condition est vraie ?",
            options: [
              { id: "a", text: "ConditionalAction", isCorrect: false },
              { id: "b", text: "GroupAction avec condition", isCorrect: true },
              { id: "c", text: "IfNode", isCorrect: false },
              { id: "d", text: "ConditionalGroup", isCorrect: false }
            ],
            explanation: "GroupAction avec un paramètre 'condition' (comme IfCondition) permet d'exécuter un ensemble de nodes seulement si la condition spécifiée est vraie."
          }
        }
      ]
    }
  }
];

export default chaptersData;