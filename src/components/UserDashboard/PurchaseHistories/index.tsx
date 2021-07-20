import React from 'react';
import '../UserProfile/Profile.scss'

function PurchaseHistories({carts} : any) {
    console.log(carts);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Add to cart at</th>
                        <th>Paid at</th>
                        <th>Paid?</th>
                    </tr>
                </thead>
                <tbody>
                    {carts && carts.map((cart: any, index: number) => (
                        <tr key={index}>
                            <td>{cart.items}</td>
                            <td>{cart.createdAt && cart.createdAt.join(" ")}</td>
                            <td>{cart.paidAt}</td>
                            <td>{cart.isPaid ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PurchaseHistories;