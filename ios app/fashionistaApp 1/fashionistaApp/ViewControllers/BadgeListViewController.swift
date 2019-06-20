//
//  BadgeListViewController.swift
//  fashionistaApp
//
//  Created by admin on 25/05/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import FirebaseDatabase
import  FirebaseAuth


class BadgeListViewController: UIViewController, UITableViewDelegate, UITableViewDataSource{
   

    @IBOutlet weak var tableView: UITableView!
    
    var badgeData = [[String:UIImage]]()
    var Ref_mybadge = Database.database().reference().child("Users")


    override func viewDidLoad() {
        super.viewDidLoad()
        
        tableView.delegate = self
        tableView.dataSource = self
    
        self.Ref_mybadge.child((Auth.auth().currentUser?.uid)!).child("Badges")
            .observeSingleEvent(of: .value, with: { (snapshot3) in
                for userId in (snapshot3.children){
                    let usersnap = userId as! DataSnapshot
                    let dict = usersnap.value as! [String: String?]
                    let p = dict["photoUrl"] as! String
                    let name = dict["name"] as! String
//                    print("\(String(describing: name))")
                    let imageUrl = NSURL(string: p)!
                    URLSession.shared.dataTask(with: imageUrl as URL) {data,response,error in
                        if error != nil {
                            print(error!)
                            return
                        }
                        DispatchQueue.main.async {
                            self.badgeData.append([name:UIImage(data: data!)!])
                            self.tableView.reloadData()
                        }
                        }.resume()
                    
                }
        })
        

    }

 
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return badgeData.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "BadgeListTableViewCell") as! BadgeListTableViewCell
        let badge = badgeData[indexPath.row].first!
        cell.textLabel?.text = badge.key
        cell.imageView?.image = badge.value
        
        return cell
    }
}
