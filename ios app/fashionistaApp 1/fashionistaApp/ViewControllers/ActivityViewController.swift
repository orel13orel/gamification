//
//  ActivityViewController.swift
//  fashionistaApp
//
//  Created by admin on 31/01/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import  FirebaseAuth

class ActivityViewController: UIViewController {

    @IBOutlet weak var tableView: UITableView!
    var notifications = [Notification]()
    var users = [User]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadNotifications()
    }
    
    func loadNotifications() {
        guard let currentUser = Auth.auth().currentUser else {
            return
        }
        API.Notification.ObserveNotification(withId: currentUser.uid,completion: { (notification) in
            guard let uid = notification.from else {
                return
            }
            self.fetchUser(uid: uid, completed: {
                self.notifications.insert(notification, at: 0)
                self.tableView.reloadData()
            })
        })
    }

    func fetchUser(uid:String,completed: @escaping () -> Void ){
        API.User.observeUser(withId: uid) { (user) in
            self.users.insert(user, at: 0)
            completed()
        }
    }
    
}

extension ActivityViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return notifications.count
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "ActivityTableViewCell", for: indexPath) as! ActivityTableViewCell
        let notification = notifications[indexPath.row]
        let user = users[indexPath.row]
        cell.notification = notification
        cell.user = user
        return cell
    }
}
