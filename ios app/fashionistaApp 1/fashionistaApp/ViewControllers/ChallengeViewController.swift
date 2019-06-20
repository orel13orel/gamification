//
//  ChallengeViewController.swift
//  fashionistaApp
//
//  Created by admin on 05/06/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import FirebaseDatabase
import  FirebaseAuth

struct cellData {
    var opened = Bool()
    var title = String()
    var sectionData = [String]()
}


class ChallengeViewController: UIViewController, UITableViewDelegate, UITableViewDataSource{

    @IBOutlet weak var tableView: UITableView!
    var Ref_mybadge = Database.database().reference().child("Users")
    var Ref_Challenges = Database.database().reference().child("Challenge")
    var Ref_Context = Database.database().reference().child("Context")
    var ChallengeData = [String]()

   var tableViewData = [cellData]()
    
   
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.delegate = self
        tableView.dataSource = self
        
        Ref_mybadge.child((Auth.auth().currentUser?.uid)!).observe(.value) { (snapshot) in
            let Ref_users_challenges = self.Ref_mybadge.child((Auth.auth().currentUser?.uid)!).child("ProgressInChallenges")
            Ref_users_challenges.observeSingleEvent(of: .value, with: { (snapshot3) in
                
                for userId in (snapshot3.children){
                    let actionInChallenge = userId as! DataSnapshot
                    self.Ref_Challenges.observe(.value) { (snapshot4) in
                        
                        
                        let emunetor = snapshot4.children
                        while let rest = emunetor.nextObject() as? DataSnapshot {
                            
                            let x = self.Ref_Challenges.child(rest.key)
                            x.observeSingleEvent(of: .value, with: { (snapshot10) in
                                if snapshot10.hasChild("name") && snapshot10.hasChild("start_time") && snapshot10.hasChild("end_time"){
                                    if snapshot10.hasChild("Actions"){
                                        let challName = snapshot10.childSnapshot(forPath: "name").value
                                        let start  = snapshot10.childSnapshot(forPath: "start_time").value
                                        let end = snapshot10.childSnapshot(forPath: "end_time").value
                                        let pts = snapshot10.childSnapshot(forPath: "points").value
                                        
                                        let Ref_challenge = self.Ref_Challenges.child(rest.key).child("Actions")
                                        Ref_challenge.observeSingleEvent(of: .value, with: { (snapshot5) in
                                            for userid3 in snapshot5.children {
                                                let challsnap1 = userid3 as! DataSnapshot
                                                //        print("Challenge: ", challsnap1.key )
                                                let challdict1 = challsnap1.value as! [String: String?]
                                                let chall1 = challdict1["action_id"] as? String
                                                let chall3 = challdict1["amount"] as? String
                                                //         print("\(String(describing: chall1))")
                                                if actionInChallenge.key == challsnap1.key{
                                                    //print("ok")
                                                    self.Ref_Context.observe(.value) { (snapshot7) in
                                                        let emunetor1 = snapshot7.children
                                                        while let rest1 = emunetor1.nextObject() as? DataSnapshot {
                                                            let Ref_challenge1 = self.Ref_Context.child(rest1.key).child("Action")
                                                            Ref_challenge1.observeSingleEvent(of: .value, with: { (snapshot8) in
                                                                for userid9 in snapshot8.children {
                                                                    let challsnap2 = userid9 as! DataSnapshot
                                                                    // print("Challenge: ", challsnap2.key )
                                                                    let challdict2 = challsnap2.value as! [String: String?]
                                                                    // let chall2 = challdict2["name"] as? String
                                                                    //  print("\(String(describing: chall2))")
                                                                    if chall1 == challsnap2.key {
                                                                        let chall2 = challdict2["name"] as? String
                                                                        print(chall2)
                                                                        
                                //                                        self.ChallengeData.append(challName! as! String)
                                  //                                      self.ChallengeData.append(chall2!)
                                 //                                       self.ChallengeData.append(start! as! String)
                                   //                                     self.ChallengeData.append(end! as! String)
                                                                        
                                                                        self.tableViewData.append(cellData(opened: false, title: challName! as! String, sectionData: ["Action name: \(chall2!)" ,"Amount: \(chall3!)","Points: \(pts!)" as! String,"Start time: \(start!)" as! String,"End time: \(end!)" as! String]))
                                                                        self.tableView.reloadData()
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    }
                                                    
                                                }
                                            }
                                        })
                                    } // if snapshot10 name
                                } // if snapshot10 Actions
                            })
                        }
                    }
                }
            })
        }
    }
    

   func numberOfSections(in tableView: UITableView) -> Int {
       return tableViewData.count
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
     //   return ChallengeData.count
   //    return tableViewData.count
        if tableViewData[section].opened == true {
            return tableViewData[section].sectionData.count + 1
       } else {
            return 1
       }
    
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let dataIndex = indexPath.row - 1
        if indexPath.row == 0 {
            guard let cell = tableView.dequeueReusableCell(withIdentifier: "ChallengeTableViewCell") else { return UITableViewCell() }
            cell.textLabel?.text = tableViewData[indexPath.section].title
            

            return cell
        } else {
            guard let cell = tableView.dequeueReusableCell(withIdentifier: "ChallengeTableViewCell") else { return UITableViewCell() }
            cell.textLabel?.text = tableViewData[indexPath.section].sectionData[dataIndex]
            return cell
        }
 //      let cell = tableView.dequeueReusableCell(withIdentifier: "ChallengeTableViewCell") as! ChallengeTableViewCell
   //     cell.textLabel?.text = ChallengeData[indexPath.row]
        
       
 //       return cell
    }
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if tableViewData[indexPath.section].opened == true {
            tableViewData[indexPath.section].opened = false
            let sections = IndexSet.init(integer: indexPath.section)
            tableView.reloadSections(sections, with: .none)
        } else {
          tableViewData[indexPath.section].opened = true
            let sections = IndexSet.init(integer: indexPath.section)
            tableView.reloadSections(sections, with: .none)
        }
    }

    
    
}
